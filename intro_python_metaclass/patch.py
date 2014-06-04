#!/usr/bin/env python

class PatchClsMeta(type):
    def __new__(cls,name,bases,kwargs):
        assert len(bases) == 1
        base = bases[0]
        for name,value in kwargs.iteritems():
            if name not in ('__module__','__metaclass__'):
                setattr(base,name,value)
        return base

class A(object):
    pass


print dir(A)

class PatchA(A):
    __metaclass__ = PatchClsMeta

    def f(self):
        print 'method added from PatchA'

print dir(A)
