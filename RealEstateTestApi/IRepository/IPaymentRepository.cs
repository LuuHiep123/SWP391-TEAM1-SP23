using Microsoft.AspNetCore.Components.Web;
using RealEstateTestApi.DTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface IPaymentRepository
    {
        public List<Payment> GetAllPayment();
        public Payment CreatePayment(Payment payment);
        public Payment UpdatePayment(string id);

    }
}
