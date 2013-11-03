#!/usr/bin/env python
import numpy

def assign(data, centroids):
    dists = numpy.ndarray((data.shape[0], centroids.shape[0]))

    for i, c in enumerate(centroids):
        delta = data - c
        dists[:, i] = numpy.sqrt(numpy.sum(delta ** 2, axis = 1))

    return dists.argmin(axis = 1)

def update(data, cluster_indices):
    n = len(set(cluster_indices))
    centroids = numpy.ndarray((n, data.shape[1]))

    for i in range(n):
        centroids[i, :] = numpy.mean(data[cluster_indices == i], axis = 0)

    return centroids

def k_means(args):
    data, n = args
    init_centroids_idx = numpy.random.choice(data.shape[0], n)
    centroids = data[init_centroids_idx]
    step_count = 0
    while True:
        step_count += 1

        indices = assign(data, centroids)
        new_centroids = update(data, indices)

        centroids, delta = new_centroids, new_centroids - centroids
        if (delta ** 2).mean() < 0.00001:
            break

    J = 0.0
    for i in range(n):
        delta = data[indices == i, :] - centroids[i]
        J += numpy.sqrt(numpy.sum((delta ** 2), axis = 1)).sum()
    J /= data.shape[0]

    print 'N =', n, 'J =', J
    return J, centroids, indices

def main():
    data = numpy.loadtxt('data')
    Ns = range(2, 16)
    args_list = [(data, n) for n in Ns]
    result = map(k_means, args_list)
    Js = [rst[0] for rst in result]

if __name__ == '__main__':
    main()
