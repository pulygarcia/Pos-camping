import { TransactionsResponseSchema } from "@/app/src/schemas";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    const searchParams = req.nextUrl.searchParams
    const transactionDate = searchParams.get('transactionDate')

    //use api endpoint
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions?transactionDate=${transactionDate}`;
    const request = await fetch(url);
    const response = await request.json();

    const transactions = TransactionsResponseSchema.parse(response);

    return Response.json(transactions);
}