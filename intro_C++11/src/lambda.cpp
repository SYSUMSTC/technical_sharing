#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main() {
	vector<int> v = {1, 3, 5, 2, 9};
	sort(v.begin(), v.end(), [](int x, int y)  {return x > y;});
	for (int i: v)
		cout << i << ' ';
	cout << endl;
}
