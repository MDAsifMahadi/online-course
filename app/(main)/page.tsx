import Hero from "@/components/Hero";
import CourseCategory from "@/components/CourseCategory";
import OurCourses from "@/components/OurCourses";
import FreeSeminar from "@/components/FreeSeminar";
import OurFeatures from "@/components/OurFeatures";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <CourseCategory />
      <OurCourses />
      <FreeSeminar />
      <OurFeatures />
      <Testimonials />
    </div>
  )
}

export default Home
