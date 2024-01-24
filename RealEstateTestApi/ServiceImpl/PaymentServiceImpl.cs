using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.ServiceImpl
{
    public class PaymentServiceImpl : IPaymentService
    {
        private IPaymentRepository paymentRepository;
        public PaymentServiceImpl(IPaymentRepository paymentRepository) 
        {
            this.paymentRepository = paymentRepository;
        }

        public Payment createPayment(Payment payment)
        {
            Payment payment1 = new Payment();   
            payment1.PaymentMethod = payment.PaymentMethod;
            payment1.Status = payment.Status;
            paymentRepository.CreatePayment(payment1);
            return payment1;
        }

        public List<Payment> GetAllPayment()
        {
            List<Payment> listPayment = paymentRepository.GetAllPayment();
            return listPayment;
        }
    }
}
