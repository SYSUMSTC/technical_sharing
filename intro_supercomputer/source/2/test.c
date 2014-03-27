#include<stdio.h>
#include<math.h>
int main()
{
	int i,j,k,p;
	float result[4];
#pragma omp parallel for num_threads(8)
	for(i = 0 ; i < 4 ; i ++)
		for(j = 0 ; j < 6 ; j ++)
			for(k = 0 ; k < 20000 ; k ++)
				for(p = 0 ; p < 20000 ; p ++)
					result[i] = sin(i) * sin(j) * sin(k) + sin(p);
	for(i = 0 ; i < 4 ; i ++)
		printf("%f\n",result[i]);
}
