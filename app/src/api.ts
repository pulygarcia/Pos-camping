export async function getPurchasesByDate(date:string){
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/purchases/api?transactionDate=${date}`;
    const request = await fetch(url);
    const response = await request.json();

    return response
}