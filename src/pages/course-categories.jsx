import React, { Suspense, useState } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { httpInterceptedServices } from '../core/http-service'
import { useTranslation } from 'react-i18next'
import CategoryList from '../features/categories/components/category-list'
import Modal from '../components/modal'

const CourseCategories = () => {
  const { t } = useTranslation()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const data = useLoaderData()
  return (
    <>
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
              {t('coursesLayout.addNewCategories')}
            </a>
          </div>
          <Suspense
            fallback={<p className="text-info">در حال دریافت اطلاعات....</p>}
          >
            <Await resolve={data.categories}>
              {(loadCategories) => <CategoryList setShowDeleteModal={setShowDeleteModal} categories={loadCategories} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <Modal
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
        title="حذف"
        body="آیا از حذف این دسته اطمینان دارید ؟"
      >
        <button type="button" className="btn btn-secondary fw-bolder" onClick={()=> setShowDeleteModal(false)}>
          انصراف
        </button>
        <button type="button" className="btn btn-primary fw-bolder">
          حذف
        </button>
      </Modal>
    </>
  )
}

export default CourseCategories

export async function categoriesLoader({ request }) {
  return defer({
    categories: loadCategories(request),
  })
}
const loadCategories = async (request) => {
  const page = new URL(request.url).searchParams.get('page') || 1
  const pageSize = import.meta.env.VITE_PAGE_SIZE
  let url = '/CourseCategory/sieve'
  url += `?page=${page}&pageSize=${pageSize}`

  const response = await httpInterceptedServices.get(url)
  return response.data
}
