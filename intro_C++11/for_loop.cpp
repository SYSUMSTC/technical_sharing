#include <iostream>

using namespace std;

int main() {
	int list[5] = {1, 2, 3, 4, 5};
	for (int x : list) {
		cout << x << ' ';
	}
	cout << endl;
	return 0;
}
