import CustomPersonCard, { CustomPersonCardProps } from "../Cards/CustomPersonCard";
import React from "react";

interface CardListProps {
  cards: CustomPersonCardProps[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className="grid gap-10 lg:gap-20 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((c, index) => {
        return (
          <CustomPersonCard
            channelName={c.channelName}
            key={index}
            title={c.title}
            description={c.description}
            img={c.img}
            href={c.href}
            tags={c.tags}
          />
        );
      })}
    </div>
  );
};

export default CardList;
