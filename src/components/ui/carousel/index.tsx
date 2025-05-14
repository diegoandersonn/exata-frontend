"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./card";
import { useState } from "react";
import santosFoto from "../../../../public/santos-foto.jpg";
import orlaDeSantos from "../../../../public/orla-de-santos.jpeg";


export default function Carousel() {
  const MAX_VISIBLE = 4;
  const [position, setPosition] = useState<number[]>([0, MAX_VISIBLE]);
  const cards = [
    {
      image: santosFoto,
      title: "Centro | São Vicente",
      description: "Sala comercial à venda no Centro",
      price: "318.000,00",
      code: "21382",
      area: "450",
      rooms: "4",
      parkingSpaces: "4",
    },
    // Adicione mais cards aqui:
    {
      image: santosFoto,
      title: "Boqueirão | Santos",
      description: "Apartamento de frente para o mar",
      price: "890.000,00",
      code: "45691",
      area: "120",
      rooms: "3",
      parkingSpaces: "2",
    },
    {
      image: orlaDeSantos,
      title: "Gonzaga | Santos",
      description: "Cobertura com vista panorâmica",
      price: "1.200.000,00",
      code: "76543",
      area: "200",
      rooms: "4",
      parkingSpaces: "3",
    },
    {
      image: orlaDeSantos,
      title: "Vila Mathias | Santos",
      description: "Sala moderna pronta para uso",
      price: "410.000,00",
      code: "55555",
      area: "80",
      rooms: "1",
      parkingSpaces: "1",
    },
    {
      image: santosFoto,
      title: "Embaré | Santos",
      description: "Apartamento mobiliado com varanda",
      price: "750.000,00",
      code: "88888",
      area: "100",
      rooms: "3",
      parkingSpaces: "2",
    },
  ];

  function switchCards(direction: "add" | "minus") {
    setPosition(([start, end]) => {
      if (direction === "add" && end < cards.length) {
        return [start + 1, end + 1];
      } else if (direction === "minus" && start > 0) {
        return [start - 1, end - 1];
      }
      return [start, end];
    });
  }
  return (
    <div className="flex flex-col items-center justify-between w-full p-4 transition-transform duration-500 ease-in-out">
      <div className="flex gap-4">
        {cards.slice(position[0], position[1]).map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            price={card.price}
            code={card.code}
            area={card.area}
            rooms={card.rooms}
            parkingSpaces={card.parkingSpaces}
          />
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        <div
          className="rounded-full p-2 shadow-xl text-zinc-400 w-12 h-12 flex justify-center items-center hover:scale-125 cursor-pointer hover:text-zinc-600 transition-transform duration-300"
          onClick={() => switchCards("minus")}
        >
          <ChevronLeft />
        </div>
        <div
          className="rounded-full p-2 shadow-xl text-zinc-400  w-12 h-12 flex justify-center items-center hover:scale-125 cursor-pointer hover:text-zinc-600 transition-transform duration-300"
          onClick={() => switchCards("add")}
        >
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}
