#include <iostream>

using namespace std;

void fun(int n) {
  cout << "The parameter is an int." << endl;
}  // A function with an int parameter
void fun(int *p) {
  cout << "The parameter is an int pointer." << endl;
}  // A function with an int pointer parameter

int main() {
    int *p = NULL;
	int *q = nullptr;
	bool equal = (p == q);  // equal = true
	int num1 = NULL;  // can be assigned
	int num2 = nullptr;  // cannot be assigned
	cout << "NULL == nullptr ? " << equal << endl;
	fun(p);  // compile error in C++98, regard as an int in C++11
	fun(q);  // regard as a pointer in C++11
	return 0;
}