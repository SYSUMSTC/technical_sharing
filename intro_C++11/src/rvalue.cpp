#include <iostream>

using namespace std;

void process(int& i) {
  cout << "Lvalue processed: " << i << endl;
}


void process(int&& i) {
  cout << "Rvalue processed: " << i << endl;
}


int main() {
  int a = 1;
  process(a);
  process(0);
  return 0;
}
