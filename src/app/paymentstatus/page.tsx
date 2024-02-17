"use client";
import { PaymobHmacTransactionObjectFrontendSchema } from "@/lib/types/paymob";
import { compareHmacFrontEnd } from "@/lib/utils/hmacCompare";
import { redirect, useSearchParams } from "next/navigation";
import { clientEnv } from "@/clientEnv";
import { safeParse } from "valibot";

const Page = () => {
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const validatedObject = safeParse(
    PaymobHmacTransactionObjectFrontendSchema,
    paramsObject
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
