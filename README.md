# Observer design pattern

- A way to define a one-to-many dependency mechanism between objects, so that when an object changes state, all its dependents are notified and updated automatically
- The benefit of using an observer-based architecture in an application is the separation of concerns and the ability to extend and modify the system's behavior without directly modifying the objects involved. This makes the code easier to maintain and scale, allowing you to add or remove observers without directly affecting the object they are observing.
- Furthermore, this architecture promotes more decoupled code, where observer classes do not need to know the internal details of the observed class.

## In the context of your code

- PaymentSubject acts as the "Subject" and Marketing and Shipment act as the "Observers". Where "Subject" emits an event such as a payment and the "Observers" are those interested in this event and process what they need to process when the event happens

## An analogy with Node.js' EventEmitter

- PaymentSubject = EventEmitter
- subscribe() e unsubscribe() = on() e off()
- notify() = emit()
