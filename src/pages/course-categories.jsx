import React, { Suspense, useState } from 'react'
import {
  Await,
  defer,
  Navigate,
  useLoaderData,
  useNavigate,
} from 'react-router-dom'
import { httpInterceptedServices } from '../core/http-service'
import { useTranslation } from 'react-i18next'
import CategoryList from '../features/categories/components/category-list'
import Modal from '../components/modal'
import { toast } from 'react-toastify'

const CourseCategories = () => {
  const { t } = useTranslation()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState()
  const navigate = useNavigate()
  const data = useLoaderData()

  const deleteCategory = (categoryId) => {
    setSelectedCategory(categoryId)
    setShowDeleteModal(true)
  }

  const handleDeleteCategory = async () => {
    setShowDeleteModal(false)
    const response = httpInterceptedServices.delete(
      `/CourseCategory/${selectedCategory}`,
    )

    toast.promise(
      response,
      {
        pending: 'درحال حذف ...',
        success: {
          render() {
            const url = new URL(window.location.href)
            navigate(url.pathname + url.search);
            return 'عملیات با موفقیت انجام شد'
          },
        },
        error : {
          render({data}){
            return t('categoryList' + data.response.data.code)
          }
        }
      },
      {
        position: "top-center"

      },
    )
  }

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
              {(loadCategories) => (
                <CategoryList
                  deleteCategory={deleteCategory}
                  categories={loadCategories}
                />
              )}
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
        <button
          type="button"
          className="btn btn-secondary fw-bolder"
          onClick={() => setShowDeleteModal(false)}
        >
          انصراف
        </button>
        <button
          type="button"
          className="btn btn-primary fw-bolder"
          onClick={handleDeleteCategory}
        >
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
