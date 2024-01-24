using RealEstateTestApi.Data;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class PaymenRepository : IPaymentRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public PaymenRepository(SWPRealEstateContext swpRealEstateContext)
        {
           this.swpRealEstateContext = swpRealEstateContext;
        }

        public Payment CreatePayment(Payment payment)
        {
            swpRealEstateContext.Payments.Add(payment);
            swpRealEstateContext.SaveChanges();
            return payment;
            
        }


        public List<Payment> GetAllPayment()
        {
            List<Payment> ListPayment = swpRealEstateContext.Payments.ToList();

            return ListPayment;
        }

        public Payment UpdatePayment(string id)
        {
            throw new NotImplementedException();
        }
    }
}
