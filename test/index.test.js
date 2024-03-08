import { expect, describe, test, jest } from '@jest/globals';
import Payment from '../src/events/payment.js';
import Marketing from '../src/observers/marketing.js';
import Shipment from '../src/observers/shipments.js';
import PaymentSubject from '../src/subjects/paymentSubject.js';

describe('Test Suite for Observer Pattern', () => {
  test('#PaymentSubject should notify observers', () => {
    const paymentSubject = new PaymentSubject();
    const marketing = new Marketing();
    const shipment = new Shipment();

    paymentSubject.subscribe(marketing);
    paymentSubject.subscribe(shipment);

    const updateSpy = jest.spyOn(marketing, 'update');

    paymentSubject.notify({ id: 1, userName: 'Test User' });

    expect(updateSpy).toHaveBeenCalledWith({ id: 1, userName: 'Test User' });
  });

  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const paymentSubject = new PaymentSubject();
    const marketing = new Marketing();
    const shipment = new Shipment();

    paymentSubject.subscribe(marketing);
    paymentSubject.subscribe(shipment);

    const marketingUpdateSpy = jest.spyOn(marketing, 'update');
    const shipmentUpdateSpy = jest.spyOn(shipment, 'update');

    paymentSubject.unsubscribe(marketing);

    paymentSubject.notify({ id: 2, userName: 'Another User' });

    expect(marketingUpdateSpy).not.toHaveBeenCalled();
    expect(shipmentUpdateSpy).toHaveBeenCalledWith({
      id: 2,
      userName: 'Another User',
    });
  });

  test('#PaymentSubject should notify subject after a credit card payment', () => {
    const paymentSubject = new PaymentSubject();
    const marketing = new Marketing();
    const shipment = new Shipment();

    paymentSubject.subscribe(marketing);
    paymentSubject.subscribe(shipment);

    const marketingUpdateSpy = jest.spyOn(marketing, 'update');
    const shipmentUpdateSpy = jest.spyOn(shipment, 'update');

    const payment = new Payment(paymentSubject);
    payment.creditCard({ id: 3, userName: 'New User', age: 25 });

    expect(marketingUpdateSpy).toHaveBeenCalledWith({
      id: 3,
      userName: 'New User',
    });
    expect(shipmentUpdateSpy).toHaveBeenCalledWith({
      id: 3,
      userName: 'New User',
    });
  });

  test('#All should notify subscribers after a credit card payment', () => {
    const paymentSubject = new PaymentSubject();
    const marketing = new Marketing();
    const shipment = new Shipment();

    paymentSubject.subscribe(marketing);
    paymentSubject.subscribe(shipment);

    const marketingUpdateSpy = jest.spyOn(marketing, 'update');
    const shipmentUpdateSpy = jest.spyOn(shipment, 'update');

    const payment = new Payment(paymentSubject);
    payment.creditCard({ id: 4, userName: 'Final User', age: 28 });

    expect(marketingUpdateSpy).toHaveBeenCalledWith({
      id: 4,
      userName: 'Final User',
    });
    expect(shipmentUpdateSpy).toHaveBeenCalledWith({
      id: 4,
      userName: 'Final User',
    });
  });
});
