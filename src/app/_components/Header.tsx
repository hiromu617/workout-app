import NextLink from "next/link";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="w-full bg-white p-3 flex justify-around items-center">
      <NextLink href="/" className="text-2xl">
        💪
      </NextLink>
      <Button asChild>
        <NextLink href="/records/new">記録する</NextLink>
      </Button>
    </header>
  );
};
