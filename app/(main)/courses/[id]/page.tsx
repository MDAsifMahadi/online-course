import CourseCard from "@/components/CourseCard";
import data from "@/data/courses.json";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { id } = await params;
    const categoryId = parseInt(id);

    const category = data.find((c) => c.id === categoryId);

    if (!category) {
        notFound();
    }

    return (
        <main className="bg-gray-50 py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {category.category}
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our professional courses in {category.category}.
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="flex flex-wrap justify-center gap-6">
                    {category.courses.map((course) => (
                        <div key={course.id} className="w-full sm:w-[350px]">
                            <CourseCard
                                id={course.id}
                                title={course.title}
                                imageSrc={course.imageSrc ? `/${course.imageSrc}` : undefined}
                                duration={course.duration}
                                rating={course.rating}
                                reviews={course.reviews}
                                students={course.students}
                                originalPrice={course.originalPrice}
                                discount={course.discount}
                                discountedPrice={course.discountedPrice}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
