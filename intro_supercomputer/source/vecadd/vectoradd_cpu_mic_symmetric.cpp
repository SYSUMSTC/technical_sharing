#include <mpi.h>
#include <omp.h>
#include <stdio.h>
#include <stdlib.h>

#define N 20000

void offload_check(int rankID)
{
#ifdef __MIC__
  printf("RankID %d running on MIC\n", rankID);
#else
  printf("RankID %d running on host\n", rankID);
#endif
}

void VecAdd_omp(float* A, float* B, float* C, int size)
{
#pragma omp parallel for
        for(int i=0;i<size;i++)
                C[i] = A[i] + B[i];
}

int main( int argc, char** argv)
{
        int i,M;
        int myrank, root=0, totalrank;
        MPI_Status status;

        MPI_Init(&argc,&argv);
        MPI_Comm_rank(MPI_COMM_WORLD,&myrank);
        MPI_Comm_size(MPI_COMM_WORLD, &totalrank);

        if(myrank == root)
                printf("total rank is:%d\n",totalrank);
        M = N / (totalrank-1);

        if(myrank == root)
        {
                float *A, *B, *C;
                int size = N * sizeof(float);
                A = (float*)malloc(size);
                B = (float*)malloc(size);
                C = (float*)malloc(size);

                srand(2013);
                for(i=0;i<N;i++)
                {
                        A[i]=rand()%10;
                        B[i]=rand()%10;
                }

                for(i=1;i<totalrank;i++)
                {
                        MPI_Send(A+(i-1)*M, M, MPI_FLOAT, i, i, MPI_COMM_WORLD);
                        MPI_Send(B+(i-1)*M, M, MPI_FLOAT, i, i, MPI_COMM_WORLD);
                }

                for(i=1;i<totalrank;i++)
                {
                        MPI_Recv(C+(i-1)*M, M, MPI_FLOAT, i, i, MPI_COMM_WORLD, &status);
                }
                for(i=0;i<N;i+=10000)
                {
                        printf("%6d: %4.2f + %4.2f = %4.2f\n",i,A[i],B[i],C[i]);
                }
                free(A);
                free(B);
                free(C);
        }
        else
        {
                float *A, *B, *C;
                int size = M * sizeof(float);
                A = (float*)malloc(size);
                B = (float*)malloc(size);
                C = (float*)malloc(size);

                MPI_Recv(A, M, MPI_FLOAT, 0, myrank, MPI_COMM_WORLD, &status);
                MPI_Recv(B, M, MPI_FLOAT, 0, myrank, MPI_COMM_WORLD, &status);

		offload_check(myrank);
		VecAdd_omp(A, B, C, M);

                MPI_Send(C, M, MPI_FLOAT, 0, myrank, MPI_COMM_WORLD);

                free(A);
                free(B);
                free(C);
        }
        MPI_Finalize();
}
