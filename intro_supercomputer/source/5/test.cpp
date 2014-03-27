#include<immintrin.h>
#include<stdio.h>
#include<stdlib.h>
#define M 100000
void foo(float *A,float *B,float *C,int N)
{
	for(int i = 0 ; i < N ; i ++)
	{
		C[i] = A[i] + B[i];
	}
}
int main()
{
	float D[M],E[M],F[M];
	for(int i = 0 ; i < M ; i ++)
	{
		D[i] = rand() / 7.0;
		E[i] = rand() / 7.0;
	}
	foo(D,E,F,M);
	for(int i = 0 ; i < M ; i ++)
		if(i % 10000 == 0)
		printf("%f\n",F[i]);
}
