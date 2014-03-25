#include<stdio.h>
#include<math.h>
#define N 16000
#define M 900000
int main()
{
	int i,j;
	float a[M],b[M],c[M];
	for(i = 0 ; i < M ; i ++)
		b[i] = rand() % 10;
	for(i = 0 ; i < N ; i ++)
	{
		for(j = 0 ; j < M ; j ++)
		{
			a[j] = b[j] + sin(i);
		}
		for(j = 0 ; j < M ; j ++)
		{
			c[j] = a[j] + sin(i);
		}
	}
	for(i = 0 ; i < M ; i ++)
		if(i % 10000 == 0)
			printf("%f\n",c[i]);
}
