import { Card, CardHeader, CardBody, Image, CardFooter, Chip } from "@heroui/react";
import Link from "next/link";
import React from "react";

export interface CustomPersonCardProps {
  title: string;
  description: string;
  img: string;
  href: string;
  channelName: string | undefined
  tags: string[]
}

const CustomPersonCard: React.FC<CustomPersonCardProps> = ({
  title,
  description,
  img,
  href,
  channelName
}) => {
  return (
    <Link href={href}>
      <p className="text-tiny text-white/60 uppercase font-bold">
        {channelName ? channelName : <br />}
      </p>
      <h4 className="text-white/90 font-semibold text-xl line-clamp-1 my-2 overflow-hidden">
        {title}
      </h4>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7"
      >
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={img}
        />
        {description && description?.length > 0 && (
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <div className="flex flex-col">
                <p className="text-tiny text-white line-clamp-2 whitespace-pre-wrap break-words">
                  {description}
                </p>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};

export default CustomPersonCard;
