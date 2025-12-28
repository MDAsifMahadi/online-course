import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";

interface CourseCategoryCardProps {
  id: number;
  title: string;
  imageSrc: string | StaticImageData;
  alt?: string;
}

const CourseCategoryCard = ({
  id,
  title,
  imageSrc,
  alt = "Course category",
}: CourseCategoryCardProps) => {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/courses/${id}`} className="flex flex-col items-center text-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-purple-100 via-purple-50 to-blue-50 flex items-center justify-center">
          <Image
            src={`/${imageSrc}`}
            alt={alt}
            width={64}
            height={64}
            className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
          {title}
        </h3>
      </Link>
    </div>
  );
};

export default CourseCategoryCard;