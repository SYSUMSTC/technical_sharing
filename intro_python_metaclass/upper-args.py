#!/usr/bin/env python

class UpperMeta(type):
    def __new__(cls, name, bases, kwargs):
        upkwargs = {k.upper():kwargs[k] for k in kwargs} 
        return type.__new__(cls, name, bases, upkwargs)

class LowCls():
    __metaclass__ = UpperMeta
    var = 'hello'

print dir(LowCls)

