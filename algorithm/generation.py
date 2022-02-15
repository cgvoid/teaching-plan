from openpyxl import load_workbook

class Anode: 
    def __init__(self, adjvex, weight=0):
        self.Adjvex = adjvex 
        self.Weight = weight


class Vnode: 
    def __init__(self, data):
        self.Data = data 
        self.Firstarc = []


class Graph:
    def __init__(self):
        self.vertList = []
        self.numVertics = 0

    def add_vertex(self, key):
        vertex = Vnode(key)
        self.vertList.append(vertex)
        self.numVertics = self.numVertics + 1
        return vertex

    def add_edge(self, val1, val2, weight=0):
        i = 0
        while i < len(self.vertList):  
            if val1 == self.vertList[i].Data:
                vnode1 = self.vertList[i]
                break
            i = i + 1
        if i == len(self.vertList):  
            vnode1 = self.add_vertex(val1)

        i = 0
        while i < len(self.vertList):  
            if val2 == self.vertList[i].Data:
                vnode2 = self.vertList[i]
                break
            i = i + 1
        if i == len(self.vertList):  
            vnode2 = self.add_vertex(val2)

        v2id = self.vertList.index(vnode2)
        p = Anode(v2id, weight)

        vnode1.Firstarc.append(p) 

class Stack():
    def __init__(self):
        self.slist = []

    def is_empty(self):
        if self.slist == []:
            return 1
        else:
            return 0

    def pushstack(self, data):
        self.slist.append(data)

    def popstack(self):
        return self.slist.pop()



def searchGraph(graph, cur_vertx_indx): 
    orderSeq = []
    visited_li = [0] * graph.numVertics
    s = Stack()
    #orderSeq.append(graph.vertList[cur_vertx_indx].Data)
    s.pushstack(cur_vertx_indx)
    visited_li[cur_vertx_indx] = 1

    while s.is_empty() !=1:
    	cur_vertx_indx = s.popstack()
    	for node in graph.vertList[cur_vertx_indx].Firstarc:
    		if visited_li[node.Adjvex] == 0:
    			s.pushstack(cur_vertx_indx)
    			s.pushstack(node.Adjvex) 
    			visited_li[node.Adjvex] = 1   
    			orderSeq.append(graph.vertList[node.Adjvex].Data)			 
    			break
    return orderSeq


if __name__ == '__main__':
	courseGraph = Graph()
	'''
	input: course_graph, i.e., triple in sheet 2 of Metabook.xlsx, such as: 
	(Intro to Computer Processing and C++, Subtopic_in, COMP1011)

	'''
	wb = load_workbook("Metabook.xlsx", read_only = True)
	coursSheet = wb["KG2_courses"]
	for i in range(3,53): # COMP 1011
		v1 = coursSheet.cell(row = i, column = 5).value
		v2 = coursSheet.cell(row = i, column = 3).value
		courseGraph.add_edge(v1, v2)
	
	startNode = 0 # CourseName do not add in Seq
	Seq = searchGraph(courseGraph, startNode)
	
	'''
	output: sequence of teaching plan, such as: ['C++', 'Control flow', ...]
	
	'''
	print(Seq)
