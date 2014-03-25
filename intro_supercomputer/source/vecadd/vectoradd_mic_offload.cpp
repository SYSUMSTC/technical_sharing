#include <stdio.h>
#include <stdlib.h>
#include <omp.h>

#define N 200000

__attribute__((target(mic))) void offload_check(void)
{
#ifdef __MIC__
  printf("Code running on MIC\n");
#else
  printf("Code running on host\n");
#endif
}

__attribute__((target(mic)))
void VecAdd_mic(float* A, float* B, float* C, int size)
{
#pragma omp parallel for
        for(int i=0;i<size;i++)
                C[i] = A[i] + B[i];
}

int main( int argc, char** argv)
{
	int i;
	int size = N * sizeof(float);

	float *A,*B,*C;
	A = (float*)malloc(size);
	B = (float*)malloc(size);
	C = (float*)malloc(size);

	srand(2013);
	for(i=0;i<N;i++)
	{
		A[i]=rand()%10;
		B[i]=rand()%10;
	}

#pragma offload target(mic) in(A,B: length(N)) out(C: length(N))
	{
		offload_check();
		VecAdd_mic(A, B, C, N);
	}

	for(i=0;i<N;i+=10000)
	{
		printf("%6d: %4.2f + %4.2f = %4.2f\n",i,A[i],B[i],C[i]);
	}

	free(A);
	free(B);
	free(C);
}
