#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class myClass {

	private:
	int n = 1;
	string s = "sicily";

	public:
	void print() {
		cout << "My int: " << n << endl;
		cout << "my string: " << s << endl;
	}
};

int main() {
	myClass instance;
	instance.print();

	vector<int> list = {1, 2, 3, 4, 5};
	cout << "My vector: ";
	for(int x: list) {
		cout << x << ' ';
	}
	cout << endl;

	return 0;
}
