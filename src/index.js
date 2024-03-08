import Payment from './events/payment.js';
import Marketing from './observers/marketing.js';
import Shipment from './observers/shipments.js';
import PaymentSubject from './subjects/paymentSubject.js';

const paymentSubject = new PaymentSubject();

const marketing = new Marketing();
const shipment = new Shipment();

paymentSubject.subscribe(marketing);
paymentSubject.subscribe(shipment);

const payment = new Payment(paymentSubject);
payment.creditCard({ id: 1, userName: 'Welington Assis', age: 30 });

paymentSubject.unsubscribe(marketing);
payment.creditCard({ id: 2, userName: 'John Doe', age: 30 });
