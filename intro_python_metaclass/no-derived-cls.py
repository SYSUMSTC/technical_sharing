#!/usr/bin/env python

class NoDerivedClsMeta(type):
    def __new__(cls,name,bases,kwargs):
        t = [i.__name__ for i in bases]
        if 'NoDerivedCls' in t:
            raise Exception('error, you cannot derived from NoDerivedCLs!')
        return type.__new__(cls,name,bases,kwargs)

class NoDerivedCls():
    __metaclass__ = NoDerivedClsMeta

try:
    class B(object):
        pass
    class A(NoDerivedCls):
        pass
except Exception,e:
    print e

