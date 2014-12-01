#!/usr/bin/env python
# encoding: utf-8
from multiprocessing import Pool as ProcessPool
# multiprocessing.dummp.Pool is in fact a thread pool. See the docs.
from multiprocessing.dummy import Pool as ThreadPool
import gevent.monkey
gevent.monkey.patch_socket()
from gevent.pool import GreenletPool
from urllib2 import urlopen
from xml.etree import ElementTree as ET


base_url = 'http://parts.igem.org/cgi/xml/part.cgi?part=%s'
ids = ['BBa_B0029', 'BBa_B0030', 'BBa_B0031', 'BBa_B0032', 'BBa_B0033',
       'BBa_B0034', 'BBa_B0035', 'BBa_B0072', 'BBa_B0073', 'BBa_B0074',
       'BBa_J01010', 'BBa_J01080', 'BBa_J61100', 'BBa_J61101', 'BBa_J61102',
       'BBa_J61103', 'BBa_J61104', 'BBa_J61105', 'BBa_J61106', 'BBa_J61107',
       'BBa_J61108', 'BBa_J61109', 'BBa_J61110', 'BBa_J61111', 'BBa_J61112',
       'BBa_J61113', 'BBa_J61114', 'BBa_J61115', 'BBa_J61116', 'BBa_J61117',
       'BBa_J61118', 'BBa_J61119', 'BBa_J61120', 'BBa_J61121', 'BBa_J61122',
       'BBa_J61123', 'BBa_J61124', 'BBa_J61125', 'BBa_J61126', 'BBa_J61127',
       'BBa_J61128', 'BBa_J61129', 'BBa_J61130', 'BBa_J61131', 'BBa_J61132',
       'BBa_J61133', 'BBa_J61134', 'BBa_J61135', 'BBa_J61136', 'BBa_J61137',
       'BBa_J61138', 'BBa_J61139', 'BBa_J63003', 'BBa_K165002']


def fetch_biobrick(part_name):
    print 'Fetching the information of', part_name
    try:
        fobj = urlopen(base_url % part_name)
        doc = ET.parse(fobj)
        part = doc.find('.//part')
        if part is None:
            raise ValueError('Biobrick %s not found' % part_name)
        part_id = part.find('./part_id').text
        short_desc = part.find('./part_short_desc').text
        nickname = part.find('./part_nickname').text
        author = part.find('./part_author').text
        seq = part.find('./sequences/seq_data').text.replace('\n', '')
    except ValueError as e:
        print e
    except IOError as e:
        print 'Network Error', e
    else:
        print 'Finish', part_name
        return part_name, part_id, short_desc, nickname, author, seq


if __name__ == '__main__':
    # map(fetch_biobrick, ids)  # sequentially

    # n = 10
    # p1 = ProcessPool(n)
    # p1.map(fetch_biobrick, ids)  # processes

    # p2 = ThreadPool(n)
    # p2.map(fetch_biobrick, ids)  # threads

    # p3 = GreenletPool(n)
    # p3.map(fetch_biobrick, ids)  # greenlets (coroutines)
    pass
