import PuchasesFilter from "@/app/components/PuchasesFilter";
import { getPurchasesByDate } from "@/app/src/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import {format} from 'date-fns'

export default async function PurchasesPage() {
  const queryClient = new QueryClient();

  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd')

  await queryClient.prefetchQuery({
    queryKey: ['purchases', formattedDate], //add formattedDate cause he could have different dates on each request
    queryFn: () => getPurchasesByDate(formattedDate),
  })

  return (
    <>
        <main className="container mx-auto mt-10">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <PuchasesFilter />
            </HydrationBoundary>
        </main>
    </>
  );
}