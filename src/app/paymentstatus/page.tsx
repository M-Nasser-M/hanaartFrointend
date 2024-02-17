import {
  type PaymobHmacTransactionObjectFrontend,
  PaymobHmacTransactionObjectFrontendSchema,
} from "@/lib/types/paymob";
import { compareHmacFrontEnd } from "@/lib/utils/hmacCompare";
import { redirect } from "next/navigation";
import { clientEnv } from "@/clientEnv";
import { safeParse } from "valibot";

type Props = {
  searchparams: PaymobHmacTransactionObjectFrontend | undefined;
};

const Page = ({ searchparams }: Props) => {
  const validatedObject = safeParse(
    PaymobHmacTransactionObjectFrontendSchema,
    searchparams
  );
  if (!validatedObject.success) {
    return redirect("/paymobdataerror");
  }
  const comparisonResult = compareHmacFrontEnd(
    clientEnv.NEXT_PUBLIC_PAYMOB_HMAC_SECRET,
    validatedObject.output,
    validatedObject.output.hmac
  );

  if (comparisonResult) {
    return redirect("/paymentsuccess");
  }

  if (!comparisonResult) {
    return redirect("/paymentfailed");
  }
};

export default Page;
