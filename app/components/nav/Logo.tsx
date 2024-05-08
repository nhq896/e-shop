import Link from "next/link";
import { Redressed, League_Spartan } from "next/font/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

interface LogoProps {
  custom?: string;
}

const Logo: React.FC<LogoProps> = ({ custom }) => {
  return (
    <Link
      href={"/"}
      className={`${leagueSpartan.className} font-extrabold text-3xl relative ${custom}`}
    >
      eshop
      <span className="font-normal text-xs absolute -bottom-1 right-0 -translate-x-1/3">
        newphoria
      </span>
    </Link>
  );
};

export default Logo;
