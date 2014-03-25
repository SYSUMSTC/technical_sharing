#include <stdio.h>
#include <stdlib.h>

#define N 200000

void VecAdd_cpu(float* A, float* B, float* C, int size)
{
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

	VecAdd_cpu(A, B, C, N);

	for(i=0;i<N;i+=10000)
	{
		printf("%6d: %4.2f + %4.2f = %4.2f\n",i,A[i],B[i],C[i]);
	}

	free(A);
	free(B);
	free(C);
}
