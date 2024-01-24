using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/Payment/")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private IPaymentService paymentService;
        private IPaymentRepository paymentRepository;
        public PaymentController(IPaymentService paymentService, IPaymentRepository paymentRepository)
        {
            this.paymentService = paymentService;
            this.paymentRepository = paymentRepository;
        }

        [HttpGet]
        [Route("GetAllPayment")]
        public IActionResult GetAllPayment()
        {
            try 
            {
                List<Payment> payments = paymentRepository.GetAllPayment();
                return Ok(payments);

            }
            catch (Exception ex)
            {
                return BadRequest("Khong the lay len du lieu");
            }
        }
    }
}
