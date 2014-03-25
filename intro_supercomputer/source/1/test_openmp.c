#include<stdio.h>
#include<math.h>
#define N 16000
int main()
{
	int i,j;
	float result[N];
#pragma omp parallel for num_threads(3)
	for(i = 0 ; i < N ; i ++)
		for(j = 0 ; j < 20000 ; j ++)
			result[i] = sin(i) * sin(j);
	for(i = 0 ; i < N ; i ++)
		if(i % 1000 == 0)
			printf("%f\n",result[i]);
}
