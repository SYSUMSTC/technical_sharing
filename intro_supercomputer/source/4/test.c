#include<stdio.h>
#include<math.h>
#define N 200000
int main()
{
	int i,j;
	float a[N];
#pragma omp parallel for num_threads(8)
	for(i = 0 ; i < N ; i ++)
	{
		k = fun(i);
		for(j = 0 ; j < k ; j ++)
			a[i] = sin(i) * sin(j);
	}
	for(i = 0 ; i < N ; i ++)
		if(i % 1000 == 0)
			printf("%f\n",a[i]);
			
}
