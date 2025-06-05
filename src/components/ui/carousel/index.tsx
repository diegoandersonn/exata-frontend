"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./card";
import { useState, useEffect } from "react";

type CardType = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  code: string;
  area: string;
  rooms: string;
  parkingSpaces: string;
};

export default function Carousel() {
  const [maxVisible, setMaxVisible] = useState(4);
  const [position, setPosition] = useState<number[]>([0, 4]);
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setMaxVisible(1);
      } else if (window.innerWidth < 768) {
        setMaxVisible(2);
      } else if (window.innerWidth < 1280) {
        setMaxVisible(3);
      } else {
        setMaxVisible(4);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPosition(() => [0, maxVisible]);
  }, [maxVisible]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/imoveis", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar dados dos imóveis");
        }
        const responseData = await response.json();
        console.log("Dados recebidos:", responseData);
        const formattedCards: CardType[] = responseData.map(
          (item: CardType) => ({
            id: item.id,
            image: item.image,
            title: item.title,
            description: item.description,
            price: item.price,
            code: item.code,
            area: item.area,
            rooms: item.rooms,
            parkingSpaces: item.parkingSpaces,
          })
        );
        setCards(formattedCards);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
    fetchData();
  }, []);

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
        {cards.slice(position[0], position[1]).map((card) => (
          <Card
            key={card.id}
            id={card.id}
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
          className="rounded-full p-2 shadow-xl text-zinc-400 w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center hover:scale-125 cursor-pointer hover:text-zinc-600 transition-transform duration-300"
          onClick={() => switchCards("minus")}
        >
          <ChevronLeft />
        </div>
        <div
          className="rounded-full p-2 shadow-xl text-zinc-400 w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center hover:scale-125 cursor-pointer hover:text-zinc-600 transition-transform duration-300"
          onClick={() => switchCards("add")}
        >
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}
