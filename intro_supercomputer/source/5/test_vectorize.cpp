#include<immintrin.h>
#include<stdio.h>
#include<stdlib.h>
#define M 100000
void foo(float *A,float *B,float *C,int N)
{
#ifdef __MIC__
	__m512 _A,_B,_C;
	for(int i = 0 ; i < N ; i +=16)
	{
		_A = _mm512_loadunpacklo_ps(_A,(void*)(&A[i]));
		_A = _mm512_loadunpackhi_ps(_A,(void*)(&A[i + 16]));
		_B = _mm512_loadunpacklo_ps(_B,(void*)(&B[i]));
		_B = _mm512_loadunpackhi_ps(_B,(void*)(&B[i + 16]));
		_C = _mm512_add_ps(_A,_B);
		_mm512_packstorelo_ps((void*)(&C[i]),_C);
		_mm512_packstorehi_ps((void*)(&C[i + 16]),_C);
	}
#endif
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
