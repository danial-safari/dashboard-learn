import { useLoaderData } from "react-router-dom";
import Course from "./course.jsx";

const CourseList = () => {
    const loadedCourses = useLoaderData();

    return (
        <>
            <div className="row">
                {
                    loadedCourses?.length > 0 ? (
                        loadedCourses.map((course) => (
                            <div className="col-4" key={course.id}>
                                <Course {...course} />
                            </div>
                        ))
                    ) : (
                        <p>No courses available.</p>
                    )
                }
            </div>
        </>
    );
};

export default CourseList;