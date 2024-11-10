import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { httpInterceptedServices } from '@core/http-service'

const AddOrUpdateCategories = ({ setShowAddCategory }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onClose = () => {
    setShowAddCategory(false)
  }
  const onSubmit = (data) => {
    setShowAddCategory(false)
    const response = httpInterceptedServices.post('/CourseCategory/', data)
    toast.promise(
      response,
      {
        pending: {
          render() {
            return t('toastNotification.updatePending')
          },
        },
        success: {
          render() {
            const url = new URL(window.location.href)
            navigate(url.pathname + url.search)

            return t('toastNotification.success')
          },
        },
        error: {
          render({ data }) {
            if (data.response.status === 400) {
              return t('categoryList.' + data.response.data.code)
            } else {
              return 'خطا در اجرای عملیات'
            }
          },
        },
      },
      {
        position: 'bottom-left',
      },
    )
  }
  return (
    <div className="card">
      <div className="card-body">
        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">نام</label>
            <input
              className={`form-control form-control-lg ${
                errors.name && 'is-invalid'
              }`}
              {...register('name', { required: true })}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="text-danger small fw-bolder mt-1">نام الزامی است</p>
            )}
          </div>
          <div className="text-start mt-3">
            <button
              type="button"
              className="btn btn-lg btn-secondary ms-2"
              onClick={onClose}
            >
              بستن
            </button>
            <button type="submit" className="btn btn-lg btn-primary ms-2">
              ثبت تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddOrUpdateCategories
