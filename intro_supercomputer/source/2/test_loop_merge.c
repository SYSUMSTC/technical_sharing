#include<stdio.h>
#include<math.h>
int main()
{
	int i,j,k,p,q;
	float result[4];
#pragma omp parallel for num_threads(8)
	for(q = 0 ; q < 4 * 6 ; q ++)
	{
		i = q / 6;
		j = q % 6;
		for(k = 0 ; k < 20000 ; k ++)
			for(p = 0 ; p < 20000 ; p ++)
				result[i] = sin(i) * sin(j) * sin(k) + sin(p);
	}
	for(i = 0 ; i < 4 ; i ++)
		printf("%f\n",result[i]);
}
