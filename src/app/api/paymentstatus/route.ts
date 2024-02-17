import { PaymobHmacTransactionObjectBackendSchema } from "@/lib/types/paymob";
import { compareHmacBackEnd } from "@/lib/utils/hmacCompare";
import { serverEnv } from "@/serverEnv";
import { safeParse } from "valibot";

export async function POST(request: Request) {
  const body = await request.json();

  const validatedRequest = safeParse(
    PaymobHmacTransactionObjectBackendSchema,
    body
  );

  if (!validatedRequest.success) {
    return new Response("request body validation failed", { status: 400 });
  }

  const compareResult = compareHmacBackEnd(
    serverEnv.PAYMOB_HMAC_SECRET,
    validatedRequest.output,
    validatedRequest.output.obj.data.secure_hash
  );

  if (!compareResult) return new Response("Invalid request", { status: 400 });
  console.log("sucess hmac callback");

  console.log("success wohooo");

  return new Response("request Valid");
}
