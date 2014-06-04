#!/usr/bin/env python

class SinClsMeta(type):

    def __new__(cls,name,bases,kwargs):
        kwargs['singleton'] = None
        return type.__new__(cls,name,bases,kwargs)

    def __init__(cls,name,bases,kwargs):
        old_new = getattr(cls,'__new__')
        @staticmethod
        def new_new(cls,*args,**kargs):
            if cls.singleton is None:
                cls.singleton = old_new(cls,*args,**kargs)
            return cls.singleton
        setattr(cls,'__new__',new_new)


class SingleCls():
    __metaclass__ = SinClsMeta

print 'before instantiation...'
print 'SingleCls.singleton:',SingleCls.singleton

print '#1 instantiate...'
obj1 = SingleCls()
print 'SingleCls.singleton:',SingleCls.singleton

print '#2 instantiate...'
obj2 = SingleCls()
print 'SingleCls.singleton:',SingleCls.singleton

