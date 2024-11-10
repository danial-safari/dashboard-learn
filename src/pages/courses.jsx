import React, { Suspense } from 'react'
import { httpInterceptedServices } from '@core/http-service'
import CourseList from '../features/courses/components/course-list'
import { useTranslation } from 'react-i18next'
import { Await, defer, useLoaderData } from 'react-router-dom'

const Courses = () => {
  const { t } = useTranslation()
  const data = useLoaderData();
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <a
            className="btn btn-primary fw-bolder mt-n1"
            href="#"
            data-direction={
              localStorage.getItem('language') === 'fa' ? 'rtl' : 'ltr'
            }
          >
            <i className="fas fa-plus ms-2"></i>
            {t('coursesLayout.addButton')}
          </a>
        </div>
        <Suspense fallback={<p className='text-info'>در حال دریافت اطلاعات....</p>}>
          <Await resolve={data.courses}>
            {(loadCourses) => <CourseList courses={loadCourses} />}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}

export default Courses

export async function coursesLoader() {
  return defer({
    courses: loadCourses(),
  })
}
const loadCourses = async () => {
  const response = await httpInterceptedServices.get('/Course/list')
  return response.data
}
