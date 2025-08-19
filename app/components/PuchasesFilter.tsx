'use client'

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import {format} from 'date-fns'
import { useQuery } from "@tanstack/react-query";
import { getPurchasesByDate } from "../src/api";
import { Transaction, TransactionContent } from "../src/schemas";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function PurchasesFilter() {
    const [value, onChange] = useState<Value>(new Date());

    const formattedDate = format(value?.toString()!, 'yyyy-MM-dd');

    const {data, isLoading} = useQuery({
      queryKey: ['purchases', formattedDate],
      queryFn: () => getPurchasesByDate(formattedDate)
    })

    const totalRecauded = data?.reduce((acc:any, transaction:Transaction) => acc + transaction.total, 0);

  return (
    <div className="flex items-start gap-6 p-4">

      <div className="bg-white rounded-xl shadow p-4">
        <Calendar onChange={onChange} value={value}/>
      </div>

      {/* Result */}
      <div className="flex-1 bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Total recaudado:
          <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full font-mono">
            ${totalRecauded}
          </span>
        </h2>
        {/* content */}
        {isLoading &&  <p>Cargando ventas...</p>}

        {data && data.length === 0 && <p>No hay ventas para esta fecha</p>}

        {data && data.length > 0 && (
          <div className="max-h-screen overflow-y-auto p-2 border border-gray-200 rounded-xl">
            <ul className="space-y-4">
              {data.map((transaction: Transaction) => (
                <li key={transaction.id} className="bg-gray-50 shadow-sm rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Venta #{transaction.id}</span>
                    <span className="text-green-600 font-bold">${transaction.total}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">
                    Fecha: {format(new Date(transaction.date), 'yyyy/MM/dd HH:mm')}
                  </p>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Productos:</p>
                    <ul className="pl-4 list-disc space-y-1">
                      {transaction.contents.map((content: TransactionContent) => (
                        <li key={content.id} className="flex items-center gap-4 bg-white p-2 rounded shadow-sm">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/${content.product.image}`}
                            alt={content.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="text-gray-800 font-semibold">{content.product.name}</p>
                            <p className="text-gray-600 text-sm">
                              ${content.price} x {content.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
