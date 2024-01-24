using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface IPaymentService
    {
        public List<Payment> GetAllPayment();
        public Payment createPayment(Payment payment);
    }
}
