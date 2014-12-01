# An Introduction to Concurrent Programming

Richard Tsai

## Overview

* Response time
* Parallelize IO operations
* Make full use of hardware resources
* How does the OS schedules tasks?
* “Concurrent” v.s. “Parallel”

## Process-level Concurrency

### What is a process ?

* An image of a program in memory, along with some other necessary information
* Scheduled by the OS
* Has a “state” (three basic states: **running**, **ready**, **blocked**)
* Isolate with each other in most cases (IPC will be required when multiple processes need to cooperate)

### Process-level Concurrency

#### Pros and cons

* Pros
  1. Easy to use and no need to care about race conditions in most cases
  2. Utilize multiple cores
  3. Tasks can be easily dispatch to multiple nodes through networks

* Cons
  1. Memory inefficient (can be relieved by the **CoW** mechanism)
  2. Process creation/switch overhead (creation overhead can be reduced by the **pre-fork** mechanism)
  3. IPC overhead

#### Implementations

* The `fork` and `waitpid` system calls
* Python's `multiprocessing` package
* MPI implementations

## Multithreading

### Process v.s. thread

* Threads are the running units within a process
* Can be dispatch to exactly one CPU core
* A process has its own memory space, while a thread only has its own stack
* Threads are more lightweight than processes so the creation/switch overhead is smaller
* Since threads are memory shared, **race conditions** are much more frequent

### KLT v.s. ULT

* Implemented in kernel-space/user-space (schedule by the kernel/library, dispatch to cores/KLTs)
* The creation/switch overhead of ULTs is often very small
* In some kinds of ULT, only the partial stack is private
* Some kinds of ULT are so lightweight that thousands of ULTs can run on a normal single core machine
* Most ULT implementations are easy to use
* A ULT must be mapped onto a KLT when running
* When a ULT invoke a **blocking system call**, the whole KLT is blocked

### 1:1 Multithreading (Pure KLT)

* Most of `pthread` implementations (e.g. NPTL in Linux)
* Simple wrappers for kernels' threading facilities (e.g. Python's `threading` package)

### N:1 Multithreading (Pure ULT)

#### Coroutine

*Most of the modern pure ULT libraries are implemented in some forms of coroutine.*

* Coroutines are cooperative multitasking, and are scheduled explicitly, so **thread safety** is less important
* Extremely lightweight
* Only IO operations can happen simultaneously
* Can only run on a single CPU core (not a big issue for most cases)
* Suitable for IO-bound applications, implemented with kernel's **non-blocking IO** or **event-driven IO** support

#### Implementations

* `Boost.Coroutine` for C++
* Python's generator and `greenlet` for Python
* Ruby's fiber

### M:N Multithreading (Hybrid threading)

*M:N multithreading has been abandoned by most modern operating systems, but is adopted by more and more language VMs.*

#### Features

* Separate business logic and runtime environment (ULTs are created on demand of business logic, while KLTs are created according to runtime environment, and can use different scheduling policies)
* Utilize multiple cores
* Efficiently maintain plenty of threads
* A solution to IO-bound large scale concurrent programming (alternatives include asynchronous IO and event-driven IO)
* In some implementations, ULTs are “process-like” (i.e. do not share memory space) with high performance IPC mechanisms

#### Implementations

* Erlang processes
* Goroutines

### High level threading libraries/standards

#### Features

* No need to concern about the creation and destructions of threads
* Intelligently map subtasks onto threads
* Highly optimized
* OpenMP is a standard rather than a library
* GCD supports heterogeneous computing

#### Implementations

* OpenMP
* Intel Threading Building Blocks
* Apple Grand Central Dispatch

## Some issues in concurrent programming

### Shared resources

#### Race conditions

#### Concurrency control

* Atomic operations (Exchange, Compare-and-swap, Fetch-and-X)

  Fast and easy to use, but cannot handle complex transactions

* Locking (Deadlock) (mutex, semaphore, condition variable, monitor)

  Flexible but slow, hard to use, and may lead to deadlock.

* Multiversion Concurrency Control (MVCC) (Mostly used in DBMS and STM)

  Fast but has storage overhead and commits may fail.


### Communications between concurrent components

* Shared memory (an important kind of shared resources)
* Message passing (lock-free but overhead is large)