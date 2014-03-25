#include<stdio.h>
#include<math.h>
#define N 16000
int main()
{
	int i,j;
	float result[N];
	for(i = 0 ; i < N ; i ++)
		for(j = 0 ; j < 200000 ; j ++)
			result[i] = sin(i) * sin(j);
	for(i = 0 ; i < N ; i ++)
		if(i % 1000 == 0)
			printf("%f\n",result[i]);
}
