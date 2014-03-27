#include<stdio.h>
#include<math.h>
__attribute__((target(mic))) mic_compute()
{
	int i,j;
	float a[10000];
	for(i = 0 ; i < 10000 ; i ++)
		for(j = 0 ; j < 10000 ; j ++)
			a[i] = sin(i) + sin(j);
	for(i = 0 ; i < 10000 ; i ++)
		if(i % 1000 == 0)
			printf("MIC:%f\n",a[i]);
}

void cpu_compute()
{
	int i,j;
	float a[10000];
	for(i = 0 ; i < 10000 ; i ++)
		for(j = 0 ; j < 10000 ; j ++)
			a[i] = sin(i) + sin(j);
	for(i = 0 ; i < 10000 ; i ++)
		if(i % 1000 == 0)
			printf("CPU:%f\n",a[i]);
}

int main()
{
	int counter;
	float *in1;
	counter = 10;
	while(counter > 0)
	{
#pragma offload target(mic:0) 
		{
			mic_compute();
		}
		cpu_compute();
		counter --;
	}
}
